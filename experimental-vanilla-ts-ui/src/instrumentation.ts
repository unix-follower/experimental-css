import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions"
import { defaultResource, resourceFromAttributes } from "@opentelemetry/resources"
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web"
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import opentelemetry from "@opentelemetry/api"
import {
  ConsoleMetricExporter,
  MeterProvider,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics"
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http"

const resource = defaultResource().merge(
  resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "experimental-vanilla-ts-ui",
    [ATTR_SERVICE_VERSION]: "1.0.0",
  }),
)
const provider = new WebTracerProvider({
  resource,
  spanProcessors: [
    new SimpleSpanProcessor(new OTLPTraceExporter({ url: import.meta.env.VITE_OTLP_TRACES_URL })),
  ],
})

provider.register()

export const tracer = provider.getTracer("experimental-vanilla-ts-ui-tracer")

const consoleMetricReader = new PeriodicExportingMetricReader({
  exporter: new ConsoleMetricExporter(),
  // Default is 60000ms (60 seconds). Set to 10 seconds.
  exportIntervalMillis: 10000,
})

const otlpMetricReader = new PeriodicExportingMetricReader({
  exporter: new OTLPMetricExporter({ url: import.meta.env.VITE_OTLP_METRICS_URL }),
  exportIntervalMillis: 10000,
})

const serviceMeterProvider = new MeterProvider({
  resource,
  readers: [consoleMetricReader, otlpMetricReader],
})

opentelemetry.metrics.setGlobalMeterProvider(serviceMeterProvider)
