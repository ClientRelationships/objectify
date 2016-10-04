interface Factory {
  name: string;
  make (...constructorArguments: Array<string>): any;
}

export = Factory;