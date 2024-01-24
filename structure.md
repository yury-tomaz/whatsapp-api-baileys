# Folder Structure Conventions

> Folder structure options and naming conventions for software projects

### A typical top-level directory layout

    .
    ├── docs                    # Documentation files (alternatively `doc`)
    ├── src                     # Source files (alternatively `lib` or `app`)
    ├── test                    # Automated tests (alternatively `spec` or `tests`)
    ├── tools                   # Tools and utilities
    ├── LICENSE
    └── README.md

> Use short lowercase names at least for the top-level files and folders except
> `LICENSE`, `README.md`

### Automated tests
    
        .
        ├── ...
        ├── test                    # Automated tests (alternatively `spec` or `tests`)
        │   ├── integration         # Integration tests
        │   └── e2e                 # End-to-end tests
        └── ...

### Documentation

        .
        ├── ...
        ├── docs                    # Documentation files (alternatively `doc`)
        │   ├── TOC.md              # Table of contents
        │   ├── faq.md              # Frequently asked questions
        │   ├── misc.md             # Miscellaneous information
        │   ├── usage.md            # Getting started guide
        │   └── ...     
        └── ...

### Source files

        .
        ├── ...
        ├── src                     # Source files
        │   ├── application         # Application layer 
        │   ├── domain              # Domain layer (business logic)
        │   ├── infrastructure      # Infrastructure layer (frameworks, drivers, etc.)
        │   ├── main                # Main layer (entry point) 
        │   ├── presentation        # Presentation layer (UI, controllers, etc.)
        │   └── ...     
        └── ...

# Clean Architecture Folder Structure

### Domain layer
The Domain layer sits at the core of the Clean Architecture. It is the heart of your application and is responsible for its core models. Here, we define things such as entities, value objects, aggregates, domain events, exceptions, repository interfaces, etc.


        .
        ├── ...
        ├── src                     # Source files
        │   ├── domain              # Domain layer (business logic)
        │   │   ├── events          # Domain events
        │   │   ├── entities        # Entities (business objects)
        │   │   ├── exceptions      # Domain exceptions (errors)
        │   │   ├── repositories    # Repository interfaces
        │   │   ├── shared          # Shared domain code
        │   │   ├── value-objects   # Value objects (immutable objects)
        │   │   └── ...     
        │   └── ...     
        └── ...

### Application layer
The Application layer sits just above the Domain layer. It acts as an orchestrator for the Domain layer, containing the most crucial use cases in your application. You can structure your use cases using services or commands and queries. Following the CQRS pattern, I make use of this approach.

        .
        ├── ...
        ├── src                     # Source files
        │   ├── application         # Application layer 
        │   │   ├── abstractions    # Application abstractions (interfaces)
        │   │   ├── behaviors       # Application behaviors (commands, queries, etc.)
        │   │   ├── contracts       # Application contracts (interfaces)
        │   │   ├── features        # Application features (use cases)
        │   │       ├── commands    # Application commands
        │   │       ├── queries     # Application queries
        │   │       ├── events      # Application events   
        │   └── ...     
        └── ...

### Infrastructure layer
The Infrastructure layer sits at the outermost layer of the Clean Architecture. It contains all the implementation details of the application. Here, we define things such as database access, external API calls, file system access, etc.

        .
        ├── ...
        ├── src                     # Source files
        │   ├── infrastructure      # Infrastructure layer (frameworks, drivers, etc.)
        │   │   ├── config          # Configuration files
        │   │   ├── database        # Database access
        │   │   ├── http            # HTTP access
        │   │   ├── logging         # Logging
        │   │   ├── messaging       # Messaging (e.g. RabbitMQ)
        │   │   ├── repositories    # Repository implementations
        │   │   ├── services        # External services (e.g. AWS, Firebase)
        │   │   ├── shared          # Shared infrastructure code
        │   │   └── ...     
        │   └── ...     
        └── ...

### Presentation layer
The Presentation layer sits just above the Application layer. It is responsible for handling HTTP requests and returning the appropriate HTTP responses. It also contains the application's controllers, view models, and other presentation-related code.

        .
        ├── ...
        ├── src                     # Source files
        │   ├── presentation        # Presentation layer (UI, controllers, etc.)
        │   │   ├── controllers     # Controllers
        │   │   ├── middleware      # Middleware
        │   │   ├── models          # View models
        │   │   ├── routes          # Routes
        │   │   ├── shared          # Shared presentation code
        │   │   └── ...     
        │   └── ...     
        └── ...

### Main layer
The Main layer sits at the outermost layer of the Clean Architecture. It contains the entry point of the application. Here, we define things such as the dependency injection container, the HTTP server, the database connection, etc.

        .
        ├── ...
        ├── src                     # Source files
        │   ├── main                # Main layer (entry point) 
        │   │   ├── config          # Configuration files
        │   │   ├── container       # Dependency injection container
        │   │   ├── database        # Database connection
        │   │   ├── http            # HTTP server
        │   │   ├── logging         # Logging
        │   │   ├── messaging       # Messaging (e.g. RabbitMQ)
        │   │   ├── shared          # Shared main code
        │   │   └── ...     
        │   └── ...     
        └── ...
