export class Job {
  id: number;
  company: string;
  logo: string;
  position: string;
  role: string;
  level: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
  admin_id: number;
  posted_at: string;
  new: boolean;
  featured: boolean;

  constructor({
    id,
    company,
    logo,
    position,
    role,
    level,
    contract,
    location,
    languages,
    tools,
    admin_id,
    posted_at,
    new: isNew,
    featured,
  }: {
    id: number;
    company: string;
    logo: string;
    position: string;
    role: string;
    level: string;
    contract: string;
    location: string;
    languages: string[];
    tools: string[];
    admin_id: number;
    posted_at: string;
    new: boolean;
    featured: boolean;
  }) {
    this.id = id;
    this.company = company;
    this.logo = logo;
    this.position = position;
    this.role = role;
    this.level = level;
    this.contract = contract;
    this.location = location;
    this.languages = languages;
    this.tools = tools;
    this.admin_id = admin_id;
    this.posted_at = posted_at;
    this.new = isNew;
    this.featured = featured;
  }
}
