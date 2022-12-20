
## Instalação

Antes de tudo, é necessário a instalação do php 8.1 e node v16.17.0, em conjunto, é necessário composer para o php e yarn/npm para o node

Após a instalação dos mesmos,acesse a pasta **Backend** e use o comando

composer install

Apos finalizar, execute o comando 

php artisan db:seed

Em seguida execute

php artisan serve

Agora já é possivel acessar a api atráves da url http://127.0.0.1:8000


Agora vamos para o frontend

Acesse a pasta **web** e utilize o comando

npm install

Logo em seguida execute o comando

npm run dev
