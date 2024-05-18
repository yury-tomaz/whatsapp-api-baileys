# Folder Structure Conventions

This document describes the structure of the Node.js project that uses Domain-Driven Design (DDD). It provides an overview of the main directories and files, explaining the purpose of each.


### A typical top-level directory layout
    .
    ├── .docker                 # Docker configurations and scripts
    ├── .gihub                  # 
    ├── envs                    # Environment configuration files
    ├── src                     # Application source code
    ├── test                    # Automated tests
    ├── create-rsa.js           # Script to generate RSA keys
    ├── docker-compose.ci.yaml  # Docker Compose configuration for CI
    ├── docker-compose.elk.yaml # Docker Compose configuration for ELK stack
    ├── docker-compose.yml      # Core Docker Compose configuration for development
    ├── Dockerfile              # Dockerfile for development environment
    ├── Dockerfile.prod         # Dockerfile for production environment
    ├── generate-token.js       # Script to generate tokens
    ├── jest.config.ts          # Jest configuration file
    └── ...


### Source files
    .
    ├── ...
    ├── src                     # Source files
    │   ├── main                # Main layer (entry point)
    │   │   ├── adapters        # Adapters for external systems
    │   │   ├── compose         # Dependency injection and composition root
    │   │   ├── middlewares     # Express middlewares
    │   │   ├── routes          # API routes
    │   │   └── server          # Server configuration and startup  
    │   ├── modules             # Aplication modules
    │   │   ├── @shared         # Shared resources and utilities   
    │   │   ├── module          # Isolated Module
    │   │   │   ├── domain      # Domain models and logic
    │   │   │   ├── events      # Event handling
    │   │   │   ├── facade      # Facade pattern implementation
    │   │   │   ├── factory     # Factory classes
    │   │   │   ├── gateway     # Gateway for external services
    │   │   │   ├── helpers     # Helper functions and utilities
    │   │   │   ├── repository  # Data access and repository pattern
    │   │   │   └── usecase     # Application use cases
    │   │   └── ...   
    │   ├── presentation        # Presentation layer (UI, controllers, etc.)
    │   │   ├── controllers     # Controladores para manipulação de requisições e respostas
    │   │   ├── http-types      # Tipos e definições HTTP usados na camada de apresentação
    │   │   ├── interfaces      # Interfaces para componentes da camada de apresentação
    │   │   ├── validators      # Validadores para dados de entrada e regras de negócio
    │   │   └── ...             # Outros componentes específicos da apresentação
    │   └── ...     
    └── ...   