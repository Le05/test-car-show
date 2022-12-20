## Instalação

Antes de tudo, é necessário a instalação dos seguintes itens

**NodeJs v.16:** com npm ou yarn

**PHP 8.1:** com o composer

Após a instalação dos mesmos, acesse a pasta **Backend** e use o comando

```bash
  composer install
```

Antes de continuar, é necessário configurar o arquivo .env, para que seja possivel acesso ao banco. O banco utilizado por mim, foi o postgres, porém, pode utilizar qualquer versão de banco de dados (Recomendo Postgres ou Mysql).


Apos finalizar a configuração do .env, execute o comando 

```bash
  php artisan migrate
```

Em seguida 

```bash
  php artisan db:seed
```

Em seguida execute

```bash
  php artisan serve
```

Agora já é possivel acessar a api atráves da url http://127.0.0.1:8000;

Agora vamos para o frontend

Acesse a pasta **web** e utilize o comando

```bash
npm install
```

Logo em seguida execute o comando

```bash
npm run dev
```

**Atenção aos retornos do terminal, pois a porta dos servers podem mudar**


## Como acessar

Assim que terminar os passos acima, já será possivel ter a api e o front funcionando, portanto, basta acessar a url que foi retornada no terminal do front. Para acesso a tela interna de login, podes utilizar as credenciais abaixo

**Email**: teste@teste.com
**Senha**: 123456