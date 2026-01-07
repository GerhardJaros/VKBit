/**
 * Route Constants
 * Zentrale Definition aller Routen zur Vermeidung von "Magic Strings"
 */

export const ROUTES = {
  HOME: '',
  KOMPONENTEN: 'komponenten',
  FORMULARE: 'formulare',
  KOMMUNIKATION: 'kommunikation',
  ROUTING: 'routing',
  OAUTH: 'oauth',
  STATE_MANAGEMENT: 'state-management',
  SEPARATION: 'separation',
  RXJS: 'rxjs',
  PIPES: 'pipes',
  BENUTZER: 'benutzer',
  BENUTZER_DETAIL: (id: number | string) => `benutzer/${id}`
} as const;

// Type-Safe Route-Helfer
export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
