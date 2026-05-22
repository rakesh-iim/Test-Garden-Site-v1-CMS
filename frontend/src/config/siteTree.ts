import type { LucideIcon } from 'lucide-react';
import {
  BookText,
  BriefcaseBusiness,
  FileImage,
  FilePenLine,
  FolderOpen,
  Globe,
  Home,
  Image as ImageIcon,
  Info,
  LayoutTemplate,
  MapPinned,
  NotebookPen,
  PanelsTopLeft,
  ScrollText,
  Shield,
  Sparkles,
  Trees,
} from 'lucide-react';
import { pageFieldSets, type EditorField } from './contentSchema';
import type { PageId } from '../types/content';

export interface EditorNode {
  type: 'editor';
  id: string;
  label: string;
  path: string;
  pageId: PageId;
  title: string;
  description: string;
  icon: LucideIcon;
  fields: EditorField[];
}

export interface FolderNode {
  type: 'folder';
  id: string;
  label: string;
  icon: LucideIcon;
  children: TreeNode[];
}

export interface LinkNode {
  type: 'link';
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}

export type TreeNode = EditorNode | FolderNode | LinkNode;

export const siteTree: TreeNode[] = [
  {
    type: 'folder',
    id: 'global',
    label: 'Global',
    icon: Globe,
    children: [
      {
        type: 'editor',
        id: 'global-navigation',
        label: 'Navigation',
        path: '/dashboard/global/navigation',
        pageId: 'global_navigation',
        title: 'Global Navigation',
        description: 'Manage the main website navigation, menu labels, anchor targets, and primary call-to-action.',
        icon: PanelsTopLeft,
        fields: pageFieldSets.global_navigation,
      },
      {
        type: 'editor',
        id: 'global-footer',
        label: 'Footer',
        path: '/dashboard/global/footer',
        pageId: 'global_footer',
        title: 'Global Footer',
        description: 'Edit footer navigation, copyright line, social links, and footer CTA.',
        icon: LayoutTemplate,
        fields: pageFieldSets.global_footer,
      },
    ],
  },
  {
    type: 'folder',
    id: 'pages',
    label: 'Pages',
    icon: FolderOpen,
    children: [
      {
        type: 'editor',
        id: 'homepage',
        label: 'Homepage',
        path: '/dashboard/pages/homepage',
        pageId: 'homepage',
        title: 'Homepage',
        description: 'Edit the homepage hero, consultation block, expertise intro, and testimonials.',
        icon: Home,
        fields: pageFieldSets.homepage,
      },
      {
        type: 'editor',
        id: 'about',
        label: 'About Us',
        path: '/dashboard/pages/about',
        pageId: 'about',
        title: 'About Us',
        description: 'Manage the About page hero, stats, philosophy copy, and values grid.',
        icon: Info,
        fields: pageFieldSets.about,
      },
      {
        type: 'editor',
        id: 'services-page',
        label: 'Services Overview',
        path: '/dashboard/pages/services',
        pageId: 'services',
        title: 'Services Overview',
        description: 'Edit the overview page headline, summary, and all service cards used across the website.',
        icon: BriefcaseBusiness,
        fields: pageFieldSets.services,
      },
      {
        type: 'folder',
        id: 'service-details',
        label: 'Service Detail Pages',
        icon: Sparkles,
        children: [
          {
            type: 'editor',
            id: 'service-terrace',
            label: 'Terrace Transformation',
            path: '/dashboard/pages/services/terrace',
            pageId: 'service_terrace_transformation',
            title: 'Terrace Transformation Page',
            description: 'Edit the service detail page copy for Terrace Transformation.',
            icon: Trees,
            fields: pageFieldSets.service_terrace_transformation,
          },
          {
            type: 'editor',
            id: 'service-balcony',
            label: 'Balcony Makeover',
            path: '/dashboard/pages/services/balcony',
            pageId: 'service_balcony_makeover',
            title: 'Balcony Makeover Page',
            description: 'Edit the service detail page copy for Balcony Makeover.',
            icon: Trees,
            fields: pageFieldSets.service_balcony_makeover,
          },
          {
            type: 'editor',
            id: 'service-penthouse',
            label: 'Penthouse Transformation',
            path: '/dashboard/pages/services/penthouse',
            pageId: 'service_penthouse_transformation',
            title: 'Penthouse Transformation Page',
            description: 'Edit the service detail page copy for Penthouse Transformation.',
            icon: Trees,
            fields: pageFieldSets.service_penthouse_transformation,
          },
          {
            type: 'editor',
            id: 'service-office',
            label: 'Office Landscaping',
            path: '/dashboard/pages/services/office',
            pageId: 'service_office_landscaping',
            title: 'Office Landscaping Page',
            description: 'Edit the service detail page copy for Office Landscaping.',
            icon: Trees,
            fields: pageFieldSets.service_office_landscaping,
          },
        ],
      },
      {
        type: 'editor',
        id: 'gallery',
        label: 'Gallery',
        path: '/dashboard/pages/gallery',
        pageId: 'gallery',
        title: 'Gallery Page',
        description: 'Edit the gallery page intro and the visible portfolio item metadata.',
        icon: FileImage,
        fields: pageFieldSets.gallery,
      },
      {
        type: 'editor',
        id: 'projects',
        label: 'Projects / Blogs',
        path: '/dashboard/pages/projects',
        pageId: 'projects',
        title: 'Projects / Blogs Page',
        description: 'Manage the projects listing intro and the featured project cards shown on the page.',
        icon: NotebookPen,
        fields: pageFieldSets.projects,
      },
      {
        type: 'editor',
        id: 'contact',
        label: 'Contact',
        path: '/dashboard/pages/contact',
        pageId: 'contact',
        title: 'Contact Page',
        description: 'Edit the contact hero, lead generation copy, and all store locations.',
        icon: MapPinned,
        fields: pageFieldSets.contact,
      },
      {
        type: 'editor',
        id: 'booking',
        label: 'Booking',
        path: '/dashboard/pages/booking',
        pageId: 'booking',
        title: 'Booking Page',
        description: 'Edit the booking and lead generation messaging used by the dedicated booking route.',
        icon: BookText,
        fields: pageFieldSets.booking,
      },
      {
        type: 'folder',
        id: 'legal',
        label: 'Legal Pages',
        icon: Shield,
        children: [
          {
            type: 'editor',
            id: 'privacy',
            label: 'Privacy Policy',
            path: '/dashboard/pages/legal/privacy',
            pageId: 'privacy',
            title: 'Privacy Policy Page',
            description: 'Manage the hero and body copy for the privacy policy page.',
            icon: ScrollText,
            fields: pageFieldSets.privacy,
          },
          {
            type: 'editor',
            id: 'terms',
            label: 'Terms of Service',
            path: '/dashboard/pages/legal/terms',
            pageId: 'terms',
            title: 'Terms of Service Page',
            description: 'Manage the hero and body copy for the terms of service page.',
            icon: FilePenLine,
            fields: pageFieldSets.terms,
          },
        ],
      },
    ],
  },
  {
    type: 'folder',
    id: 'media',
    label: 'Media',
    icon: ImageIcon,
    children: [
      {
        type: 'link',
        id: 'media-library',
        label: 'Library',
        path: '/dashboard/media/library',
        icon: ImageIcon,
      },
    ],
  },
];

export const flattenEditorNodes = (nodes: TreeNode[]): EditorNode[] =>
  nodes.flatMap((node) => {
    if (node.type === 'editor') return [node];
    if (node.type === 'folder') return flattenEditorNodes(node.children);
    return [];
  });

export const flattenAllNodes = (nodes: TreeNode[]): Array<EditorNode | LinkNode> =>
  nodes.flatMap((node) => {
    if (node.type === 'folder') return flattenAllNodes(node.children);
    return [node];
  });

export const editorNodes = flattenEditorNodes(siteTree);
