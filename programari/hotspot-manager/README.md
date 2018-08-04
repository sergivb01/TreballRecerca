# Hotspot Manager

## Usage

All responses will have the form

```json
{
    "data": "Mixed type holding the content of the response",
    "message": "Description of what happened"
}
```

Subsequent response definitions will only detail the expected value of the `data field`

### Auth MAC device

**Definition**

`POST /api/auth/<mac>`

**Response**

- `200 OK` on success
- `500 ERROR` if error

```json
{
	"error": false,
	"message": "todo"
}
```