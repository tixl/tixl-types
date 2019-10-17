# Tixl types

If a project uses tixl-types, you have to initialize it accordingly (see https://git-scm.com/book/en/v2/Git-Tools-Submodules).

In the project working directory run

```
git submodule init
git submodule update
```

## SQLite schema

See [schema definition file](./etc/sqlite/sqlite.md).

## TXL address

The TXL address consists of the NTRU public key. It is encoded in base64. Let's see an example address: 

> AQMAAhDM30jOV7brHOsvy48q2MPqEUPA1JskavwSz9cAxuVHIE4XPBkacJhAJvu3ZHBBPI4as6mbD9XVVxFApYwxrxZ782T4mQjWsNSzZI6u8Lo5EsCgug/EV6GsM7P1gaHZWzNyYv4jFVMk+/RflMtyNT7G8nc5mV5zxUhvMeB2+tTFeg1xdQ/dHBCfkeEzWmmxzPKCQR+qQ2wiHExXlWflOe+a+qE4gMfxl2YbylgPEi/WrpLJd3wzgHt904dNTtqexmV8pkeWmR+oB80PK+Gsy+jI6cZiGTRQAfOw0bF8bxbXrspNLasIEXMht7DyzvCACapi20+QGnYQACtFfmDi1YdhimhX95PUeVGbpDvgOKp3SEisDZSFpL5GySfa661HZSM5F/YNuLVCaHbB8ZLhZcHNjqV8RErY/ED7Wb2WNM8PqgLyNsIeSh5s/pU9kmZi/tbI7JbFEo1KCRIel78rs1VDPmgF9L9ujwnd4q/81s94i2Jbs7G5WBHkSdkR150KSIdziIpTyMCdd1wWCg44YMoQfFbLQJ001QCjWQG8k7IdL2x21bELaRU+Ox6zHG0P1PTeyoon4dkxsc0Qyl7LMA2uJTMbae1VDfkMZl7s57b0Euj17v3aNnVm7HzZ1tx7abL6z1yVeCxwU9SME8n6dnCrsXdvT9w3+hNRNPQjVPf3Kynn4j4aA6gw8q5Y4MXTs/Vl+R7oanJCRRGwqMcTl1wO+K/lvkotvSA=
