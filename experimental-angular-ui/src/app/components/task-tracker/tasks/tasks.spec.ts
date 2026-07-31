import { ComponentFixture, TestBed } from "@angular/core/testing"
import { provideHttpClient } from "@angular/common/http"
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing"
import { Tasks } from "./tasks"

describe("Tasks", () => {
  let component: Tasks
  let fixture: ComponentFixture<Tasks>
  let httpTestingController: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tasks],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents()

    httpTestingController = TestBed.inject(HttpTestingController)

    fixture = TestBed.createComponent(Tasks)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it("should create", () => {
    const req = httpTestingController.expectOne("http://localhost:8000/task-tracker/tasks")
    expect(req.request.method).toEqual("GET")
    req.flush([])

    expect(component).toBeTruthy()
  })
})
