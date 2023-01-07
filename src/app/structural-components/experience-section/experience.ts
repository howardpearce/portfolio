/**
 * Contains all the information required to display a work experience on screen
 */
export class Experience {
  title: string;
  date: string;
  description: string;
  bullets: string[];
  tags: string[];

  /**
   * Create a new experience
   * @param title Title of the experience
   * @param date Date that the experience occurred as a string
   * @param description Description of the experience
   * @param bullets Bullet list of action statements that summarize what was done during experience
   * @param tags Bullet list of the technologies used during the experience
   */
  constructor(title: string, date: string, description: string, bullets: string[], tags: string[]) {
    this.title = title;
    this.date = date;
    this.description = description;
    this.bullets = bullets;
    this.tags = tags;
  }
}
