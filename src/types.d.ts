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
export type LinkData = { link: string; label: string };
export type SpecData = { id: string; spec: string };
export type IntroData = { title: string; lead: string; link_list: LinkData[] };
export type GraphData = {
  id: string;
  title: string;
  percentage: number;
  category: string;
};

export type ActivityData = {
  id: string;
  icon: 'ui' | 'dev' | 'design' | 'illustration';
  title: string;
  description: string;
};

export type CareerData = {
  id: string;
  logo_svg: string;
  name: string;
  year_start: number;
  year_end: number;
  title: string;
  description: string;
};

export type EducationData = CareerData;

export type SlideData = {
  slider: ProjectImages;
  slug: string;
  title?: string;
};

export type SkillData = {
  id: string;
  title: string;
  description: string;
  graphs: GraphData[];
};

export interface EmailData {
  name: string;
  email: string;
  message: string;
  subject: string;
}

export interface IntroProps extends React.HTMLAttributes<HTMLElement> {
  link_list: LinkData[];
  title: string;
  lead: string;
}

export interface CodeProps {
  project: ProjectDetails;
  posts: PostData[];
}

export interface AboutProps {
  intro: IntroData;
  link_list: LinkData[];
  activity: ActivityData[];
  career: CareerData[];
  education: EducationData[];
  skills: SkillData[];
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

type IntroData = {
  title: string;
  lead: string;
  link_list: LinkData[];
};

export interface ListPageProps {
  intro: IntroData;
  link_list: LinkData[];
  slug: string | string[];
  children: React.ReactNode;
  pageTitle: string;
  imageURL: string;
  pageDescription: string;
}

export interface AsideProps {
  imageURL: string;
  intro: IntroData;
  link_list: LinkData[];
}

export interface CardListProps {
  children: React.ReactNode;
  slug: string | string[];
}
