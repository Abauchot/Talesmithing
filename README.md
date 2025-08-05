# 📚 Talesmithing

**Talesmithing** is a full-stack mobile application that helps tabletop RPG players and game masters manage their fictional universes — characters, locations, items, timelines, relationships, and notes — all in one place, accessible from any device.

> 🛠️ Built entirely in **TypeScript** with **NestJS** (backend) and **Expo (React Native)** (frontend).

---

## 🎲 Who is this for?

Talesmithing is made for:

- 🧙‍♂️ **Game Masters** running complex tabletop campaigns
- 🧝 **Players** who want to track their characters and adventures
- ✍️ **Worldbuilders & writers** creating their own settings
- 🎨 **Creative teams** working together on shared universes

Whether you're managing a dungeon crawl, a political drama, or a galactic saga — Talesmithing gives you the tools to structure and collaborate on your lore.

---

## 🚀 Project Goals

- Provide a rich, mobile-friendly interface to build and browse a shared fictional world.
- Help RPG players and GMs organize lore across campaigns, characters, and timelines.
- Demonstrate a modern, modular, and maintainable full-stack architecture using TypeScript from end to end.

---

## 🧰 Tech Stack

### 🧠 Backend – [NestJS](https://nestjs.com/)
- JWT authentication (signup, login, roles)
- REST or GraphQL API (to be decided during implementation)
- PostgreSQL via [Prisma ORM](https://www.prisma.io/)
- Modular architecture (auth, users, projects, entities, timelines...)
- File handling (images, maps, avatars) via Multer or S3
- Security: Guards, Pipes, Role-based Access Control (RBAC), Validation

### 📱 Frontend – [Expo (React Native)](https://expo.dev/)
- Mobile-first responsive interface (Android, iOS, Web)
- Navigation powered by `expo-router`
- Markdown editor & viewer
- Timeline, entity, and relationship visualizations
- Offline storage & syncing
- Authentication and collaborative project management

---

## 🧱 Core Features

- 🔐 **Auth**: register, login, and manage user roles (owner, editor, viewer)
- 🏗 **Projects**: create and manage collaborative lore universes
- 📖 **Entities**: characters, places, and items with detailed sheets
- 🔗 **Relationships**: links between entities (friend, enemy, parent, etc.)
- 🕰 **Timelines**: project-specific chronological event tracking
- 📝 **Notes**: markdown notes attached to entities or projects
- 📁 **Media Upload**: link images/maps to entities
- 🧑‍🤝‍🧑 **Collaboration**: share projects with granular access rights
- 🌐 **Cross-platform**: mobile + web support

---


## 🛠 Planned Features
🔄 Change history and lightweight versioning

🗺 Interactive map view for locations

🔎 Full-text search

🌙 Dark mode & theme customization

📡 Push notifications (invitations, new notes, etc.)

🧑‍💻 Author  
 Full Stack Developer
 [LinkedIn](https://www.linkedin.com/in/antoine-bauchot/)

## 📃 License & Notice

This project is released under the **MIT License**.

> ⚠️ **Disclaimer**: Talesmithing is currently a **work-in-progress** personal project, shared publicly for **educational and portfolio purposes**.  
> Features, structure, and code may change frequently as development evolves.

Feel free to explore, fork, or draw inspiration from the repository.  
However, please be aware that the project is not yet production-ready.

