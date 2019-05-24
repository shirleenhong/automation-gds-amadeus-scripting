# bpg-gds-scripting-amadeus

## Setting up your dev environment

1. Install Node

```
$ node --version
v11.11.0
```

2. Confirm NPM version

```
$ npm --version
6.7.0
```

3. Download dependencies (make sure you're connected to the CWT network)

```
npm install
```

4. Spin up a local version of the webapp

```
npm run-script start
```

5. Access webapp as a Smartscript via Amadeus Sellconnect, login to Amadeus acceptance environment using a Canada OID (YTOWL2107)
Open a new command page in SellCo and add a name field and a CF line

```
nm1test/test
RM*CF/-RBM
```
Finally open Scripts>CWT Canada Leisure Local to access your locally deployed webapp
