import { Message, MessageProviderContract } from './message-provider.contract';

describe('MessageProviderContract', () => {

  let underTest: MessageProviderContract;

  beforeEach(() => {
    underTest = new MessageProviderContract({
      provider: 'foo',
      consumer: 'bar',
      dir: 'dir/to/contracts',
    });
  });

  it('creates an empty contract', () => {
    const expectedContract = {
      consumer: {
        name: 'bar'
      },
      provider: {
        name: 'foo'
      },
      messages: [{}],
      metadata: {
        pactSpecification: {
          version: '3.0.0'
        }
      },
    };

    expect(underTest.toJson()).toEqual(JSON.stringify(expectedContract, undefined, 2));
  });

  it('stores a message with description', () => {
    const contract = underTest.expectsToReceive('my description').writeContract();

    expect(contract.messages.length).toBe(1);
    expect(contract.messages[0].description).toBe('my description');
  });

  it('stores a message with provider state', () => {
    const contract = underTest.given('my provider state').writeContract();

    expect(contract.messages.length).toBe(1);
    expect(contract.messages[0].providerStates[0].name).toBe('my provider state');
  });

  it('stores a message with topic and payload', () => {
    const contract = underTest.withContent({
      topic: 'my/topic',
      payload: 'myPayload'
    }).writeContract();

    expect(contract.messages.length).toBe(1);
    expect(contract.messages[0].contents.topic).toBe('my/topic');
    expect(contract.messages[0].contents.payload).toBe('myPayload');
  });

  it('stores a message with metadata', () => {
    const contract = underTest.withMetadata({
      contentType: 'application/json'
    }).writeContract();

    expect(contract.messages.length).toBe(1);
    expect(contract.messages[0].metadata).toEqual({contentType: 'application/json'});
  });

  it('stores a message with payload matcher', () => {
    const contract = underTest.payloadMatching('\\d+').writeContract();

    expect(contract.messages.length).toBe(1);
    expect(contract.messages[0].matchingRules.body['$.payload'].matchers[0].regex).toEqual('\\d+');
  });
});
