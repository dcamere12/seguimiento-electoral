# Plaza Vea - Frontend

Plaza Vea - Frontend en un proyecto en HTML/CSS/Javascript y PWA para el E-commerce de Plaza Vea.


### Requerimientos de desarrollo ###

* [Node.js](https://nodejs.org/) para el manejo del servidor.
* [Git](https://git-scm.com/) para el control de verisones.
* [npm](https://www.npmjs.com/) para el manejo de paquetes.

### Configurar el ambiente de trabajo ###

Para empezar a trabajar con el proyecto se requiere, primero clonar el proyecto y luego instalar todas las dependencias con:

```bash
npm install
```

### Flujo de trabajo ###

Para el flujo de trabajo se tienen los siguientes comandos:

```bash
gulp build          # Compila para el ambiente de desarrollo
gulp release        # Compila para el ambiente de producción
gulp run            # Inicia el servidor web y detecta los cambios
```

Una vez lanzado el servidor web se puede acceder mediante: [http://localhost:3000](http://localhost:3000)

### Gitflow ###

Se trabaja con 2 ramas principales master y develop:

```bash
master         # Contiene los archivos finales para producción
develop        # Contiene los avances de la maquetación
```

Para mayor información revisar: [Workflow Git](WORKFLOW-GIT.md)

Nota: Al hacer merge con `develop` ejecutará `gulp release` y subirá los archivos por FTP a [https://clientes.meetliquid.com/plazavea/web/](https://clientes.meetliquid.com/plazavea/web/)

### Estructura de carpetas ###
```bash
- source/       
    -- data             # Contiene los .json para cargas asíncronas
    -- fonts
    -- images
    -- styles
    -- script
        --- components  # Contiene los componentes que se concatenarán con base.js
        --- libs        # Contiene las librerías de terceros
    -- templates        # Contien los .pug del proyecto
- app/                  # Contiene los archivos compilados para testing
- prod/                 # Contiene los archivos compilados y minificados para producción
- __test__              # Contiene los scripts para las pruebas unitarias
```

### Pruebas unitarias ###
Las pruebas unitarias se realizan con [Jest](https://jestjs.io)
```bash
npm test
```
