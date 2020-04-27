# BAS Exchange Project 

## Run develop mode in local

> Checkout code from BAS Exchange Repository

```bash 
git clone https://github.com/BASChain/bas-exchange.git bas-exchange
```

### Local development dependecies packages

  - yarn (>= 1.19)
  - vue-cli (>=2.x)
  - webpack (>=4.x)

```bash
npm install -g yarn
npm install -g vue-cli
npm install -g webpack
```

### install project dependecies 
> use yarn or npm

```bash
yarn install 

or

npm install
```

### run develop mode 

> "npm run dev:seria" or "npm run dev"

## Project Sources 

|  path  |  comments |
|  --  | --  |
| build  | Store release zip and build entry file |
| ci   | Project integrated scripts  |
| config | Project configuration files |
| docs  | development documents |
| src   | Project source code |
| static  | Project static resources like images css ed.|



## Development Branch Merge WorkFlow

> Branches
>> master                 
>> develop\\
>> v1.x\\
>> v2.x\\


### develop branch

> the branch of develop always consistent with the latest branch to be tested

> current the latest branch is v2.x

### master 

> When the milestone test passes,Develop can be merged into master.

### v1.x

The Version 1.x branch

> Version History

|  Vesion  |  Update Date  |  Comments  |
|  ---- |  ----  | ----  |
| v1.0.0 | 2020-04-16 | - Support Chinese, English, Japanese<br> 1. support apply domain <br> 2. configure Domain name DNS data <br> 3. Sell my domains ed. |
| v1.0.3 | 2020-4-23 | Fixed recharge sub domain bug |


### v2.x

The new Contracts update,added mail module support

> Version History

|  Vesion  |  Update Date  |  Comments  |
|  ---- |  ----  | ----  |
| v2.0.0 | 2020-04-27 | --- |