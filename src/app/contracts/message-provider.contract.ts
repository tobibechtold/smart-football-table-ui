export class MessageProviderContract {

  state: any = {};
  messages: Array<Message> = [];
  matcher: string;

  constructor(private config: MessageConfig) {}

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  public given(providerState: string) {
    if (providerState) {
      this.state.providerStates = [
        {
          name: providerState
        }
      ];
    }

    return this;
  }

  public expectsToReceive(description: string) {
    if (description) {
      this.state.description = description;
    }

    return this;
  }

  public withContent(content: Content) {
    this.state.contents = content;

    return this;
  }

  public withMetadata(metadata: any) {
    this.state.metadata = metadata;

    return this;
  }

  public payloadMatching(regex: string) {
    this.state.matchingRules = {};
    this.state.matchingRules.body = {
      '$.topic': {},
      '$.payload': {}
    };

    this.state.matchingRules.body['$.payload'].matchers = [
      {
        match: 'regex',
        regex: regex
      }
    ];

    return this;
  }

  public asMessage(): Message {
    return this.state as Message;
  }

  public toJson(): string {
    const contract = this.writeContract();

    return JSON.stringify(contract, undefined, 2);
  }

  writeContract(): Contract {
    const contract = {
      consumer: {
        name: this.config.consumer
      },
      provider: {
        name: this.config.provider
      },
      messages: [
        this.asMessage()
      ],
      matchingRules: this.state.matchingRules,
      metadata: {
        pactSpecification: {
          version: '3.0.0'
        }
      },
    };

    return contract;
  }
}

export interface MessageConfig {
  consumer: string;
  provider: string;
  dir: string;
}

export interface Contract {
  consumer: Consumer;
  provider: Provider;
  messages: Array<Message>;
  metadata: any;
}

export interface Message {
  description: string;
  metadata: any;
  contents: Content;
  providerStates: Array<ProviderState>;
  matchingRules: MatchingRule;
}

export interface Content {
  topic: string;
  payload: string;
}

export interface MatchingRule {
  body: {
    '$.topic': Rule,
    '$.payload': Rule
  };
}

export interface Rule {
  matchers: Array<Matcher>;
  combine: string;
}

export interface Matcher {
  match: string;
  regex: string;
}

export interface ProviderState {
  name: string;
}

export interface Consumer {
  name: string;
}

export interface Provider {
  name: string;
}
