import { TestBed } from '@angular/core/testing';
import { IMqttServiceOptions, MqttModule, MqttService } from 'ngx-mqtt';
import { environment } from '../../environments/environment';
import { MqttServiceMock } from '../mocks/mqtt-service-mock';
import { like } from '@pact-foundation/pact-web/dsl/matchers';
import { Message, MessageConsumerPact } from '@pact-foundation/pact-web/pact';


describe('User Service Pact', () => {
  let provider;
  let mqttServiceMock: MqttServiceMock;
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: environment.mqttHost,
    port: environment.mqttPort,
  };

  beforeAll(() => {
    provider = new MessageConsumerPact({
      consumer: 'ui',
      provider: 'cognition',
      dir: '../../pacts',
      pactfileWriteMode: 'update'
    });

    provider.removeInteractions();
  });

  afterAll((done) => {
    provider.finalize()
      .then(() => done(), (err) => done.fail(err));
  });

  beforeEach(() => {
    mqttServiceMock = new MqttServiceMock();

    TestBed.configureTestingModule({
      imports: [MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
      providers: [{provide: MqttService, useValue: mqttServiceMock}]
    });
  });

  it('should publish score', () => {
    provider
      .given('a goal was shot')
      .expectsToReceive('the scoring team gets published')
      .withContent({
        topic: 'team/scored',
        payload: like(1)
      })
      .verify(handleMessage);
  });
});

function handleMessage(message: Message): Promise<any> {
  if (!message || !message.contents) {
    return Promise.reject();
  }

  if (message.contents.topic === 'team/scored' && message.contents.payload === 1) {
    return Promise.resolve();
  }

  return Promise.reject();
}
