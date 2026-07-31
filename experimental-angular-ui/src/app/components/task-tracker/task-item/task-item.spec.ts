import { ComponentFixture, TestBed } from "@angular/core/testing"
import { TaskItem } from "./task-item"
import { Task } from "@/app/common/task-tracker/Task"

describe("TaskItem", () => {
  let component: TaskItem
  let fixture: ComponentFixture<TaskItem>

  const mockTask: Task = {
    id: 1,
    text: "Test Task",
    day: "May 1st at 2:30pm",
    reminder: true,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItem],
    }).compileComponents()

    fixture = TestBed.createComponent(TaskItem)
    component = fixture.componentInstance

    fixture.componentRef.setInput("task", mockTask)

    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
