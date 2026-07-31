import { ComponentFixture, TestBed } from "@angular/core/testing"
import { provideRouter } from "@angular/router"
import { provideHttpClient } from "@angular/common/http"
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing"

import { Home } from "./home"

describe("Home", () => {
  let component: Home
  let fixture: ComponentFixture<Home>
  let httpTestingController: HttpTestingController
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents()

    fixture = TestBed.createComponent(Home)
    component = fixture.componentInstance
    httpTestingController = TestBed.inject(HttpTestingController)

    await fixture.whenStable()
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
