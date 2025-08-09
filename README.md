# UGO - Sistema de Tokens Digitales Universitarios

Sistema prototipo de tokens digitales para universidades, desarrollado con Next.js 15 y React 19.

## 🚀 Características

### Aplicación Móvil (Estudiantes)
- 📱 **Billetera Digital**: Gestión de 4 tipos de tokens (Comida, Transporte, Biblioteca, Acceso)
- 💸 **Transferencias**: Envío de tokens entre estudiantes
- 📊 **Dashboard Personal**: Visualización de balance y actividad
- 🔔 **Notificaciones**: Alertas de transacciones y vencimientos
- 📱 **QR Codes**: Códigos para recibir y usar tokens

### Dashboard Administrativo (Managers)
- 🖥️ **Panel de Control**: Métricas en tiempo real
- 🎯 **Scanner QR**: Validación de tokens estudiantiles
- ⚙️ **Gestión de Tokens**: Creación y configuración de tipos
- 👥 **Administración de Usuarios**: Distribución masiva de tokens
- 📈 **Analytics**: Estadísticas de uso y actividad

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── layout/         # Layouts y navegación
│   ├── modals/         # Componentes modales
│   └── ui/             # Componentes de UI básicos
├── contexts/           # React Context providers
├── features/           # Funcionalidades por módulos
│   ├── admin/          # Dashboard administrativo
│   └── mobile/         # Aplicación móvil
├── hooks/              # Custom hooks
├── lib/                # Utilidades y configuración
├── services/           # Servicios y APIs
├── types/              # Definiciones TypeScript
└── constants/          # Constantes y datos mock
```

## 🛠️ Tecnologías

- **Framework**: Next.js 15.2.4
- **Frontend**: React 19 con TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **Icons**: Lucide React
- **State**: React Context + Hooks
- **Themes**: Sistema personalizado claro/oscuro

## 🎨 Sistema de Colores

```typescript
const ugoColors = {
  primary: "#2C3E50",    // Charcoal corporativo
  red: "#FF5757",        // Tokens de Comida
  orange: "#FFA726",     // Tokens de Transporte
  blue: "#42A5F5",       // Tokens de Biblioteca
  green: "#66BB6A",      // Tokens de Acceso
}
```

## 📦 Instalación

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Análisis de código

## 📱 Funcionalidades Principales

### Para Estudiantes
1. **Visualización de Tokens**: Balance por categoría con iconos distintivos
2. **Transferencias P2P**: Envío a otros usuarios via wallet o QR
3. **Historial**: Registro completo de transacciones
4. **Perfil Digital**: QR personal y datos de cuenta

### Para Administradores
1. **Creación de Tokens**: Configuración de nuevos tipos con expiry
2. **Distribución Masiva**: Asignación a múltiples usuarios
3. **Scanner en Tiempo Real**: Validación instantánea de tokens
4. **Reportes**: Métricas de uso y adopción

## 🎯 Próximas Mejoras

- [ ] Integración con blockchain (Stellar/Ethereum)
- [ ] Base de datos persistente
- [ ] Autenticación y autorización
- [ ] Notificaciones push
- [ ] API REST completa
- [ ] Testing automatizado
- [ ] PWA capabilities

## 🤝 Contribución

Este es un proyecto prototipo. Las contribuciones son bienvenidas siguiendo las mejores prácticas de desarrollo.

---

**Desarrollado para demostración de UX/UI en sistemas de tokens universitarios**