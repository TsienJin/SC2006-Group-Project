# API Route Requirements



## Account

Login

`/account/login`

```json
// POST Request
{
    email: string,
    password: string
}


// Response
{
    usrEmail: string,
    usrName: string,
    usrID: UUID,
    sessionID: UUID
}
```



Change Field

`/account/edit`

```json
// POST Request
{
    field: "usrEmail" | "usrName" | "usrPassword",
    value: string,
    sessionID: UUID
}


// Response
{
    response: bool
}
```



Logout

`/account/logout`

```json
// POST Request
{
    sessionID: UUID,
    usrID: UUID
}


// Response
{
    response: bool
}
```



Create Account

`/account/create`

```json
// POST Request
{
    usrEmail: string,
    usrName: string,
    usrPassword: string,
}

// Response
{
    usrEmail: string,
    usrName: string,
    usrID: UUID,
    sessionID: UUID
}
```
