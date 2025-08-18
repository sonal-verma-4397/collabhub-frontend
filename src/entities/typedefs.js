/**
 * @typedef {Object} Workspace
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string[]} modulesIds
 */

/**
 * @typedef {Object} Module
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string[]} pages
 * @property {string[]} tasks
 * @property {string} team
 */

/**
 * @typedef {Object} Page
 * @property {string } id
 * @property {string} name
 * @property {string} description
 * @property {any[]} content
 */

/**
 * @typedef {Object} Task
 * @property {string | number} id
 * @property {string} title
 * @property {string} description
 * @property {"todo" | "in-progress" | "done"} status
 * @property {string[]} labels
 * @property {"low" | "medium" | "high"} priority
 * @property {string[]} assignees
 */
