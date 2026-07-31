import { Service, inject } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { Task } from "@/app/common/task-tracker/Task"
import { environment } from "@/environments/environment"

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
}

@Service()
export class TaskService {
  private readonly apiUrl = `${environment.taskTrackerApiUrl}/task-tracker/tasks`
  private readonly http = inject(HttpClient)

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions)
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`
    console.log(`Deleting task with id: ${task.id}`)
    return this.http.delete<Task>(url)
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`
    return this.http.put<Task>(url, task, httpOptions)
  }
}
