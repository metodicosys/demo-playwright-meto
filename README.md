# Ejecutar las pruebas

Copia `.env.example` a `.env` y configura las credenciales de prueba válidas.
Después, desde Git Bash:

```bash
npx bddgen
NODE_ENV=desa ROLE=admin npx playwright test --grep '@metodio'
```

No guardes credenciales reales en el repositorio. En GitHub Actions, configúralas
como secretos del repositorio.