# Manual de Creación de Sub-Agentes — AntiGravity

Este manual explica cómo extender la fuerza de trabajo de AntiGravity mediante la creación de "Sub-Agentes" especializados.

## ¿Qué es un Sub-Agente?

En el ecosistema AntiGravity, un sub-agente no es necesariamente una identidad persistente en el roster, sino una **instancia de ejecución especializada** delegada por un Agente Principal.

Por ejemplo, el **Ingeniero Backend** puede invocar un sub-agente de **QA de Código** o un sub-agente de **Documentación**, que heredan sus permisos técnicos pero se enfocan en una micro-tarea con un modelo específico.

---

## 🏗️ Paso 1: Definición en AGENTS.md

Para que un Agente Principal pueda delegar tareas, sus sub-agentes permitidos deben estar listados en su especificación dentro de `.mcp/AGENTS.md`.

```markdown
### Allowed Subagents
- May spawn **NombreDelSubAgente** for [propósito específico].
```

## 🔌 Paso 2: Configuración de Potencia (Model Power)

Ahora puedes elegir la "potencia" o capacidad del modelo que ejecutará el sub-agente desde la interfaz:

| Nivel | Descripción | Caso de Uso Recomendado |
|---|---|---|
| **Standard** | Modelos rápidos y económicos (ej. GPT-4o-mini, Claude Haiku) | Tareas simples, limpieza de datos, resúmenes rápidos. |
| **Pro** | Modelos de propósito general (ej. GPT-4o, Claude Sonnet) | Escritura creativa, lógica de programación moderada, análisis. |
| **Ultra** | Modelos de razonamiento profundo (ej. o1, Claude Opus, Gemini 1.5 Pro) | Arquitectura compleja, debugging difícil, decisiones estratégicas. |

## 🔗 Paso 3: Implementación en n8n

El dashboard envía un payload a n8n que incluye:
- `instruction`: El comando natural.
- `agentRole`: El rol del agente principal.
- `modelPower`: El nivel seleccionado (standard, pro, ultra).
- `subAgentType`: (Opcional) El tipo específico de sub-agente.

En tu workflow de n8n, utiliza un nodo **Switch** o un **IF** para seleccionar el modelo de IA basado en `modelPower`.

## 🛠️ Buenas Prácticas

1. **Eficiencia**: Usa `Standard` para validaciones sintácticas. No gastes tokens de `Ultra` en cosas que un modelo pequeño resuelve bien.
2. **Contexto**: Los sub-agentes deben recibir el contexto necesario del Agente Principal, pero no todo el historial si no es relevante para la micro-tarea.
3. **Validación**: Siempre pasa el output de un sub-agente por el **Agente QA** si afecta el código de producción.

---

> "Delegar no es desentenderse, es optimizar la inteligencia del sistema." — Director General
