import cytoscape, { type ElementDefinition, type NodeSingular } from "cytoscape"

export function mapGraphResponse(graphResponse: ChemistryGraphResponse) {
  const elements: ElementDefinition[] = graphResponse.nodes.map((node) => ({
    group: "nodes",
    data: {
      id: node.id,
      label: node.label,
      position: { x: 100, y: 100 },
      renderedPosition: { x: 200, y: 200 },
      selected: false,
      selectable: true,
      locked: false,
      grabbable: true,
      pannable: false,
      ...node.properties,
    },
  }))
  const edges: ElementDefinition[] = graphResponse.edges.map((edge) => ({
    group: "edges",
    data: {
      id: edge.id,
      label: edge.label,
      source: edge.source,
      target: edge.target,
      ...edge.properties,
    },
  }))
  elements.push(...edges)
  return elements
}

const ELEMENT_COLOR = "#0074D9"

async function main() {
  const compoundData = mapGraphResponse(data)
  
  const cy = cytoscape({
    container: document.getElementById('cy'),
    elements: compoundData,
    layout: { name: "grid" },
    style: [
      {
        selector: "node[label='Element']",
        style: {
          "background-color": ELEMENT_COLOR,
          "text-wrap": "wrap",
          "font-size": "12px",
          color: "#FFFFFF",
        },
      },
      {
        selector: "edge",
        style: {
          "line-color": "#AAAAAA",
          "target-arrow-color": "#AAAAAA",
          "target-arrow-shape": "triangle",
          label: "data(label)",
          "font-size": "10px",
          "text-wrap": "wrap",
          "text-max-width": "80",
          color: "#000000",
        },
      },
    ],
  })

  cy.on("tap", "edge", (event) => {
    const edge = event.target
    console.log("Edge clicked:", edge.data())
  })

  cy.on("mouseover", "node", (event) => {
    const node = event.target
    console.log("Node:", node.data())
  })

  let tappedNodeId: string | null = null

  function handleTapNode(event: cytoscape.EventObject) {
    const node = event.target as cytoscape.SingularData as NodeSingular
    console.log("Node clicked:", node)
    if (tappedNodeId && tappedNodeId === node.id()) {
      node.style("background-color", ELEMENT_COLOR)
    } else {
      const prevTappedNode = cy?.nodes()
        .filter((ele) => ele.id() == tappedNodeId)
        .first()
      if (prevTappedNode) {
        prevTappedNode.style("background-color", ELEMENT_COLOR)
      }

      node.style("background-color", "black")
      tappedNodeId = node.id()
    }
  }
  cy.on("tap", "node", handleTapNode)

  // cy.destroy()
}

await main()
