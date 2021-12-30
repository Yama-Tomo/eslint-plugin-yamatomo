# Disallow blacklist module imports (`no-blacklist-imports`)

## Rule Details

This rule can be used to limit the modules to be imported.

This is useful when practicing clean architecture.

## How to Use

```json
{
  "@yamatomo/no-blacklist-imports": [
    "error",
    [
      { "paths": ["**/src/entities/*.ts{,x}"], "blacklists": ["~/presenter/*", "~/usecases/*"] },
      { "paths": ["**/src/usecases/*.ts{,x}"], "blacklists": ["~/presenter/*"] }
    ]
  ]
}
```
