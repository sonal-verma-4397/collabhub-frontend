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

export const navConfig = [
  {
    id: 1,
    label: "Home",
    path: "/workspaces/1",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    label: "Settings",
    path: "/workspaces/1/settings",
    icon: Settings,
  },
  {
    id: 3,
    label: "Analytics",
    path: "/workspaces/1/analytics",
    icon: BarChart3,
  },
  {
    id: 4,
    label: "Conversation",
    path: "/workspaces/1/chats",
    icon: MessageSquare,
  },
  {
    id: 5,
    label: "Modules",
    icon: FolderKanban,
    children: [
      {
        id: 6,
        label: "Module - 1",
        children: [
          {
            id: 7,
            label: "Pages",
            children: [
              {
                id: 8,
                label: "Page - 1",
                path: "/module-1/page-1",
                icon: FileText,
              },
              {
                id: 9,
                label: "Page - 2",
                path: "/module-1/page-2",
                icon: FileText,
              },
              {
                id: 10,
                label: "Page - 3",
                path: "/module-1/page-2",
                icon: FileText,
              },
            ],
          },
          {
            id: 10,
            label: "Board",
            children: [
              {
                id: 11,
                label: "Status",
                path: "modules/1/tasks",
                icon: CheckCircle,
              },
              {
                id: 12,
                label: "Priority",
                path: "/module-1/board/priority",
                icon: Flag,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 13,
    label: "Teams",
    icon: Users,
    children: [
      {
        id: 14,
        label: "Team Member - 1",
        path: "/teams/team-member-1",
        icon: User,
      },
      {
        id: 15,
        label: "Team Member - 2",
        path: "/teams/team-member-1",
        icon: User,
      },
      {
        id: 15,
        label: "Team Member - 3",
        path: "/teams/team-member-1",
        icon: User,
      },
      {
        id: 15,
        label: "Team Member - 4",
        path: "/teams/team-member-1",
        icon: User,
      },
      {
        id: 15,
        label: "Team Member - 5",
        path: "/teams/team-member-1",
        icon: User,
      },
      {
        id: 15,
        label: "Team Member - 6",
        path: "/teams/team-member-1",
        icon: User,
      },
      {
        id: 15,
        label: "Team Member - 7",
        path: "/teams/team-member-1",
        icon: User,
      },
    ],
  },
];
