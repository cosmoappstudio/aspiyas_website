import type { ComponentType } from 'react';
import * as LucideIcons from 'lucide-react';

export function getIcon(name: string): ComponentType<{ size?: number; className?: string }> {
  const Icon = (LucideIcons as unknown as Record<string, ComponentType<{ size?: number; className?: string }>>)[name];
  return Icon ?? (LucideIcons.Circle as ComponentType<{ size?: number; className?: string }>);
}
