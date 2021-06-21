interface Project {
  id: string;
  type: 'code' | 'illustration' | 'design' | 'other';
  title: string;
  slug: string;
  project_date: string;
}

export interface ProjectImages {
  image_small: string;
  image_small_2x: string;
  image_large: string;
  image_large_2x: string;
  caption?: string;
}

export interface ProjectData extends Project {
  description?: string;
  slider: ProjectImages;
  highlight: boolean;
  specs?: SpecData[];
}

export interface ProjectDetails extends Project {
  description: string;
  link: string;
  repository: string;
  repository_api: string;
  about: AboutData[];
  specs: SpecData[];
  images: {
    cover_small: string;
    cover_small_2x: string;
    cover_large: string;
    cover_large_2x: string;
    project_images: ProjectImages[];
    caption?: string;
  };
}

export type ClientData = {
  id: string;
  name: string;
  logo_svg: string;
  link: string;
};

export type PostData = {
  id: string;
  title: string;
  lead: string;
  slug: string;
  publish_date: string;
  update_date: string;
};

export type TestimonialData = {
  id: string;
  quote: string;
  name: string;
  jobTitle: string;
  publish_date: string;
  update_date: string;
};

export type AboutData = { id: string; type: string; text: string };
export type LinkData = { id: number; link: string; label: string };
export type SpecData = { id: string; spec: string };
export type IntroData = { title: string; lead: string; link_list: LinkData[] };
export type GraphData = { id: number; title: string; percentage: number };

export type ActivityData = {
  id: number;
  icon: 'ui' | 'dev' | 'design' | 'illustration';
  title: string;
  description: string;
};

export type CareerData = {
  id: number;
  logoSVG: string;
  name: string;
  dateInterval: string;
  title: string;
  description: string;
};

export type EducationData = {
  id: number;
  logoSVG: string;
  name: string;
  dateInterval: string;
  title: string;
  description: string;
};

export type SlideData = {
  slider: ProjectImages;
  slug: string;
  title?: string;
};

export type SkillData = {
  id: number;
  title: string;
  description: string;
  graphs: GraphData[];
};

export interface CodeProps {
  project: ProjectDetails;
  posts: PostData[];
}

export interface AboutProps {
  intro: IntroData;
  cards: ActivityData[] | CareerData[] | EducationData[] | SkillData[];
}

export interface BlogProps {
  posts: PostData[];
}

export interface ClientsProps {
  clients: ClientData[];
}

export interface SliderProps extends React.HTMLAttributes<HTMLElement> {
  slides?: SlideData[];
  testimonials?: TestimonialData[];
  contentType: 'image' | 'testimonial';
  additionalClass?: string;
  hasLink?: boolean;
  hasIcon?: boolean;
}