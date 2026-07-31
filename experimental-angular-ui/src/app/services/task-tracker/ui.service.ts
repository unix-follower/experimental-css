import { Service, signal } from "@angular/core"
import { Observable, Subject } from "rxjs"

@Service()
export class UiService {
  private readonly showAddTask = signal(false)
  private readonly subject = new Subject<boolean>()

  toggleAddTask(): void {
    this.showAddTask.set(!this.showAddTask())
    this.subject.next(this.showAddTask())
  }

  onToggle(): Observable<boolean> {
    return this.subject.asObservable()
  }
}
