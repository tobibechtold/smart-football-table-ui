import { Observable, of } from 'rxjs';

export class MqttServiceMock {
  lastMessage;

  observe(topic: string): Observable<any> {
    return of(this.lastMessage);
  }

  publish(topic: string, message: string): void {
    this.lastMessage = {topic: topic, message: message};
  }
}
