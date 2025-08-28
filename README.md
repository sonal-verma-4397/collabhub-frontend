# ProjectSync 🚀

**ProjectSync** is a lightweight and intuitive task management board built with React. It helps teams manage software project workflows visually — from Backlog to Completion — using a Kanban-style drag-and-drop interface.

---
---Project Structure---
```
└── 📁src
    └── 📁assets
        ├── react.svg
    └── 📁components
        └── 📁auth
            ├── index.jsx
            ├── login.jsx
            ├── signUp.jsx
        └── 📁context-menu
            ├── index.jsx
        └── 📁create-module
            └── 📁hooks
                ├── useIndex.js
            ├── index.jsx
        └── 📁form
            ├── Label.jsx
            ├── TaskForm.jsx
            ├── TaskList.jsx
        └── 📁layout
            └── 📁sidebar
                └── 📁components
                    └── 📁nav-item
                        └── 📁hooks
                            ├── useIndex.js
                        ├── index.jsx
                    ├── Footer.jsx
                    ├── Header.jsx
                    ├── NavItems.jsx
                ├── config.js
                ├── index.jsx
            ├── Header.jsx
            ├── Sidebar.jsx
            ├── Toast.jsx
        └── 📁task-form
            ├── index.jsx
        └── 📁task-label
            ├── index.jsx
        └── 📁task-status
            ├── index.jsx
        └── 📁ui
            ├── alert-dialog.jsx
            ├── avatar.jsx
            ├── badge.jsx
            ├── button.jsx
            ├── card.jsx
            ├── checkbox.jsx
            ├── dialog.jsx
            ├── html-tags.jsx
            ├── Input.jsx
            ├── label.jsx
            ├── my-button.jsx
            ├── my-Input.jsx
            ├── my-select.jsx
            ├── my-textArea.jsx
            ├── progress.jsx
            ├── Select.jsx
            ├── separator.jsx
            ├── sheet.jsx
            ├── sidebar.jsx
            ├── skeleton.jsx
            ├── switch.jsx
            ├── tabs.jsx
            ├── Text.jsx
            ├── TextArea.jsx
            ├── tooltip.jsx
        └── 📁utility
            ├── ComingSoon.jsx
            ├── Error.jsx
            ├── Menu.jsx
        ├── userProfile.jsx
    └── 📁context
        ├── ConversationSocket.jsx
        ├── DragAndDrop.jsx
        ├── GlobalContext.jsx
        ├── LocalStorage.jsx
        ├── Socket.jsx
        ├── TaskPreview.jsx
        ├── Toaster.jsx
    └── 📁data
        ├── constants.js
        ├── navItems.js
    └── 📁entities
        └── 📁schema
            ├── module.schema.js
            ├── page.schema.js
            ├── task.schema.js
            ├── workspace.schema.js
        └── 📁utils
            ├── createAndValidate.js
        ├── typedefs.js
    └── 📁hoc
        ├── withAuth.jsx
        ├── withPublic.jsx
    └── 📁hooks
        ├── use-mobile.js
        ├── useAnimatedPresence.js
    └── 📁lib
        ├── utils.js
    └── 📁loader
        ├── MyTasksLoader.jsx
    └── 📁pages
        └── 📁about
            ├── index.jsx
        └── 📁analytics
            └── 📁components
                ├── LabelSummery.jsx
                ├── MyAreaChart.jsx
                ├── MyPieChart.jsx
            └── 📁utility
                ├── util.js
            ├── index.jsx
        └── 📁conversation
            ├── index.jsx
        └── 📁document
            ├── Page.jsx
        └── 📁home
            ├── index.jsx
        └── 📁overview
            ├── index.jsx
            ├── page-header.jsx
        └── 📁tasks-board
            └── 📁components
                ├── Header.jsx
                ├── Search.jsx
                ├── task-card.jsx
                ├── TaskList.jsx
                ├── TaskPrivew.jsx
                ├── Tasks.jsx
            └── 📁hooks
                ├── useDragDrop.js
            ├── index.jsx
        └── 📁user
            └── 📁components
                └── 📁create-workspace
                    ├── index.jsx
                └── 📁header
                    ├── index.jsx
                └── 📁search
                    ├── index.jsx
                └── 📁welcome-message
                    ├── index.jsx
                └── 📁workspace-card
                    ├── index.jsx
                └── 📁workspaces
                    ├── index.jsx
            ├── index.jsx
        ├── Setting.jsx
    └── 📁utils
        ├── cn.js
        ├── filters.js
        ├── formaters.js
        ├── Task.js
        ├── validations.js
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    └── PublicLayout.jsx
```
## 📸 Screenshot

### Version 1.0.0

![image](https://github.com/user-attachments/assets/ad012841-0213-44c0-afea-dd1058b21c49)
![image](https://github.com/user-attachments/assets/c3292be4-df41-47b3-9fc1-80971ddbcacc)

---

### Version 1.1.0

![image](https://github.com/user-attachments/assets/947ff2ff-0d9b-47ac-a379-2556aaccd979)


---
### Version 1.2.0
## Add label Inputs button
![image](https://github.com/user-attachments/assets/9291551d-33d3-4fc8-b213-2c11c73c7827)

## filter via titla and description
![image](https://github.com/user-attachments/assets/e30b53b1-6b6b-4f85-8089-39d46234277c)

## label input form
![image](https://github.com/user-attachments/assets/8c3ff1c1-ecc2-4159-9bf7-f7295cd62414)

---

## 🧠 Features

* ✅ Add, update, and delete tasks
* ✅ Drag-and-drop tasks between columns (HTML5 native DnD)
* ✅ Organize tasks under `Todo`, `In Progress`, `Completed`, and `Backlog`
* ✅ Context API + LocalStorage for efficient state management and persistence
* ✅ Clean, dark-mode responsive UI
* ✅ Modular and extensible codebase

---

## 💠 Tech Stack

* **React + Vite**
* **Context API** for global state
* **LocalStorage** for client-side persistence
* **HTML5 Drag and Drop API**
* **Tailwind**

---

## 🚧 Columns

* 📋 **Backlog**: Tasks to be discussed or groomed
* 🔧 **Todo**: Tasks selected for upcoming sprints
* 🚧 **In Progress**: Tasks currently being developed
* ✅ **Completed**: Finished tasks

---

## 🔄 Local Setup

```bash
git clone https://github.com/sahil-verma-9696/projectsync.git
cd projectsync
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## 🎯 Version

**v1.0 - Initial release**

* Basic task creation & management
* Drag-and-drop between boards
* Task persistence with localStorage

---

## 🛡️ License

MIT License. Feel free to fork, modify, and build upon this project.

---

## 🙌 Future Enhancements (v2.0 Ideas)

* ⏰ Due dates and deadlines
* 🏷️ Tagging & filters
* 📊 Analytics dashboard
* 👥 User authentication & team collaboration
* ☁️ Cloud sync (e.g., Firebase or Supabase)

---

## ✨ Made with ❤️ by Sahil Verma
