import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ShapePicker } from "./shape-picker"

describe("ShapePicker", () => {
  let fixture: ComponentFixture<ShapePicker>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShapePicker],
    }).compileComponents()

    fixture = TestBed.createComponent(ShapePicker)
    await fixture.whenStable()
  })

  it("should render title", async () => {
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector("label")?.textContent).toContain("Choose shapes:")
  })
})
