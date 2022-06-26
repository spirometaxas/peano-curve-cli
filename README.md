# peano-curve-cli
Print the Peano Curve to the console!

## Usage
### Via `npx`:
```
$ npx peano-curve-cli <n>
```

### Via Global Install
```
$ npm install --global peano-curve-cli
$ peano-curve-cli <n>
```

### Via Import
```
$ npm install peano-curve-cli
```
then:
```
const peano_curve = require('peano-curve-cli');
console.log(peano_curve.create(<n>));
```