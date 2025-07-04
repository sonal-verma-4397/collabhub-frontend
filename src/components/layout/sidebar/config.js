import {
  LayoutDashboard,
  Settings,
  BarChart3,
  MessageSquare,
  FolderKanban,
  Users,
  User,
  FileText,
  Kanban,
  CheckCircle,
  Flag,
} from "lucide-react";

const modules = [
  {
    id: "123",
    label: "Module - 1",
    pages: ["page-4", "page-2", "page-3"],
    tasks: ["task-1", "task-2", "task-3"],
  },
  {
    id: "124",
    label: "Module - 2",
    pages: ["page-1", "page-5", "page-6"],
    tasks: ["task-1", "task-2", "task-3"],
  },
];

const pages = [
  {
    id: "page-1",
    name: "Page - 1",
    description: "This is page 1",
    content: [],
  },
  {
    id: "page-2",
    name: "Page - 2",
    description: "This is page 2",
    content: [],
  },
  {
    id: "page-3",
    name: "Page - 3",
    description: "This is page 3",
    content: [],
  },
  {
    id: "page-4",
    name: "Page - 4",
    description: "This is page 4",
    content: [],
  },
  {
    id: "page-5",
    name: "Page - 5",
    description: "This is page 5",
    content: [],
  },
  {
    id: "page-6",
    name: "Page - 6",
    description: "This is page 6",
    content: [],
  },
];

const workspaces = [
  {
    id: "111",
    name: "Workspace - 1",
    description: "This is workspace 1",
    modulesIds: ["124"],
  },
  {
    id: "222",
    name: "Workspace - 2",
    description: "This is workspace 2",
    modulesIds: ["123"],
  },
];

function generateDynamicSidebarConfig({
  modules = [],
  pages = [],
  workspaces = [],
}) {
  function filterPageByModuleId(mod) {
    return (page) => mod.pages.includes(page.id);
  }

  function filterModuleByWorkspaceId(ws) {
    return (mod) => ws.modulesIds.includes(mod.id);
  }

  function mapToPageConfig(mod, ws) {
    return (page) => ({
      id: page.id,
      label: page.name,
      path: `/workspaces/${ws.id}/modules/${mod.id}/pages/${page.id}`,
      icon: FileText,
    });
  }

  function mapToModuleConfig(ws) {
    return (mod) => ({
      id: mod.id,
      label: mod.label,
      children: [
        {
          id: `${mod.id}-pages`,
          label: "Pages",
          children: pages
            .filter(filterPageByModuleId(mod))
            .map(mapToPageConfig(mod, ws)),
        },
        {
          id: `${mod.id}-tasks`,
          label: "Tasks Board",
          children: [
            {
              id: `${mod.id}-tasks-status`,
              label: "Status",
              path: `/workspaces/${ws.id}/modules/${mod.id}/tasks?view=status`,
              icon: Kanban,
            },
            {
              id: `${mod.id}-tasks-priority`,
              label: "Priority",
              path: `/workspaces/${ws.id}/modules/${mod.id}/tasks?view=priority`,
              icon: Flag,
            },
          ],
        },
      ],
    });
  }

  function mapToWorkspaceConfig(ws) {
    return [
      {
        id: `ws-${ws.id}-home`,
        label: "Home",
        path: `/workspaces/${ws.id}`,
        icon: LayoutDashboard,
      },
      {
        id: `ws-${ws.id}-settings`,
        label: "Settings",
        path: `/workspaces/${ws.id}/settings`,
        icon: Settings,
      },
      {
        id: `ws-${ws.id}-analytics`,
        label: "Analytics",
        path: `/workspaces/${ws.id}/analytics`,
        icon: BarChart3,
      },
      {
        id: `ws-${ws.id}-chats`,
        label: "Conversation",
        path: `/workspaces/${ws.id}/chats`,
        icon: MessageSquare,
      },
      {
        id: `ws-${ws.id}-modules`,
        label: "Modules",
        icon: FolderKanban,
        children: modules
          .filter(filterModuleByWorkspaceId(ws))
          .map(mapToModuleConfig(ws)),
      },
    ];
  }

  return workspaces.map(mapToWorkspaceConfig);
}

export const navConfig = generateDynamicSidebarConfig({
  modules,
  pages,
  workspaces,
})[1];

// import {
//   LayoutDashboard,
//   Settings,
//   BarChart3,
//   MessageSquare,
//   FolderKanban,
//   Users,
//   User,
//   FileText,
//   Kanban,
//   CheckCircle,
//   Flag,
// } from "lucide-react";

// export const navConfig = [
//   {
//     id: 1,
//     label: "Home",
//     path: "/workspaces/1",
//     icon: LayoutDashboard,
//   },
//   {
//     id: 2,
//     label: "Settings",
//     path: "/workspaces/1/settings",
//     icon: Settings,
//   },
//   {
//     id: 3,
//     label: "Analytics",
//     path: "/workspaces/1/analytics",
//     icon: BarChart3,
//   },
//   {
//     id: 4,
//     label: "Conversation",
//     path: "/workspaces/1/chats",
//     icon: MessageSquare,
//   },
//   {
//     id: 5,
//     label: "Modules",
//     icon: FolderKanban,
//     children: [
//       {
//         id: 6,
//         label: "Module - 1",
//         children: [
//           {
//             id: 7,
//             label: "Pages",
//             children: [
//               {
//                 id: 8,
//                 label: "Page - 1",
//                 path: "/module-1/page-1",
//                 icon: FileText,
//               },
//               {
//                 id: 9,
//                 label: "Page - 2",
//                 path: "/module-1/page-2",
//                 icon: FileText,
//               },
//               {
//                 id: 10,
//                 label: "Page - 3",
//                 path: "/module-1/page-2",
//                 icon: FileText,
//               },
//             ],
//           },
//           {
//             id: 10,
//             label: "Board",
//             children: [
//               {
//                 id: 11,
//                 label: "Status",
//                 path: "modules/1/tasks",
//                 icon: CheckCircle,
//               },
//               {
//                 id: 12,
//                 label: "Priority",
//                 path: "/module-1/board/priority",
//                 icon: Flag,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 13,
//     label: "Teams",
//     icon: Users,
//     children: [
//       {
//         id: 14,
//         label: "Team Member - 1",
//         path: "/teams/team-member-1",
//         icon: User,
//       },
//       {
//         id: 15,
//         label: "Team Member - 2",
//         path: "/teams/team-member-1",
//         icon: User,
//       },
//       {
//         id: 15,
//         label: "Team Member - 3",
//         path: "/teams/team-member-1",
//         icon: User,
//       },
//       {
//         id: 15,
//         label: "Team Member - 4",
//         path: "/teams/team-member-1",
//         icon: User,
//       },
//       {
//         id: 15,
//         label: "Team Member - 5",
//         path: "/teams/team-member-1",
//         icon: User,
//       },
//       {
//         id: 15,
//         label: "Team Member - 6",
//         path: "/teams/team-member-1",
//         icon: User,
//       },
//       {
//         id: 15,
//         label: "Team Member - 7",
//         path: "/teams/team-member-1",
//         icon: User,
//       },
//     ],
//   },
// ];
