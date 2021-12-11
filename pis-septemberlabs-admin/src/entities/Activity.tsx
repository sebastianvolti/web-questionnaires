interface Activity {
  getType(): string;
  getTitle(): string;
  getSvgIcon(): JSX.Element;
  getComponent(activity?: Activity): JSX.Element;
  getQuestion(): string;
  getIsRequired(): boolean;
  getId(): number;
  setId(newId: number): void;
  getDestroyed(): boolean;
  setDestroyed(destroy: boolean): void;
  getResultsComponent(question: any): JSX.Element;
  clone(): Activity;
}

export default Activity;
