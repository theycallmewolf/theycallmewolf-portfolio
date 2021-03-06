import { TangramCard } from 'assets/tangrams/';
import { Card, CardBody, CardFooter, CardHeader, CustomLink } from 'components/elements';
import { Aside, CardList, Footer, Header } from 'components/sections';
import { useTheme } from 'hooks';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getIntro, getProjects } from 'services/prismic';
import { COLORS } from 'theme';
import { IntroData, LinkData, ProjectData } from 'types';

import styles from './styles.module.scss';

interface WorkProps {
  intro: IntroData;
  link_list: LinkData[];
  cards: ProjectData[];
}

const Work: NextPage<WorkProps> = ({ intro, link_list, cards }) => {
  const router = useRouter();
  const { slug } = router.query;
  const { getTheme, hasDarkMode } = useTheme();

  useEffect(getTheme);

  return (
    <>
      <Head>
        <title>work | they call me wolf</title>
        <meta
          name="description"
          content="Here's the list of some of the projects (personal and profissional) that Mr. Wolf worked on. From Web development to illustration, passing through UI design and graphic design. It's a lot... of gray hair at least."
        />
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color={hasDarkMode ? COLORS.COSMOS_BLACK : COLORS.IRIDIUM_WHITE}
        />
        <meta
          name="msapplication-TileColor"
          content={hasDarkMode ? COLORS.COSMOS_BLACK : COLORS.IRIDIUM_WHITE}
        />
        <meta
          name="theme-color"
          content={hasDarkMode ? COLORS.COSMOS_BLACK : COLORS.IRIDIUM_WHITE}
        />
      </Head>
      <main>
        <Header />
        <Aside intro={intro} link_list={link_list} imageURL="/assets/img/cover-work-alt.jpg" />
        <CardList slug={slug}>
          {cards.map(({ id, slider, slug, project_date, title, description, specs }) => (
            <Card key={id} className={styles.card}>
              <CardHeader>
                {slider.image_large_2x !== '' ? (
                  <div className={styles.imageContainer}>
                    <Link href={`/work/project/${slug}`}>
                      <a>
                        <Image
                          src={slider.image_large_2x}
                          layout="fill"
                          objectFit="cover"
                          quality={90}
                        />
                      </a>
                    </Link>
                  </div>
                ) : (
                  <TangramCard className={styles.placeholder} />
                )}
              </CardHeader>
              <CardBody>
                <span className={styles.date}>{project_date}</span>
                <h2>{title}</h2>
                <p>{description}</p>
                <ul className={styles.specs}>
                  {!!specs && specs.map(({ spec, id }) => <li key={id}>{spec}</li>)}
                </ul>
              </CardBody>
              <CardFooter>
                <CustomLink label="more" href={`/work/project/${slug}`} className={styles.button} />
              </CardFooter>
            </Card>
          ))}
        </CardList>
      </main>
      <Footer />
    </>
  );
};

export default Work;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // paths: ['/work/code', '/work/illustration', '/work/design', '/work/other'],
    paths: ['/work/code', '/work/illustration', '/work/design'],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  let cards: unknown;

  const introList = await getIntro({ area: 'work' });
  const link_list = introList.map((item) => item.link_list).flat();
  const intro = introList.filter(({ title }) => title === slug);

  const projects = await getProjects();
  const codeProjects = projects.filter((project) => project.type === 'code');
  const designProjects = projects.filter((project) => project.type === 'design');
  const illustrationProjects = projects.filter((project) => project.type === 'illustration');
  const otherProjects = projects.filter((project) => project.type === 'other');

  switch (slug) {
    case 'code':
      cards = codeProjects;
      break;

    case 'design':
      cards = designProjects;
      break;

    case 'illustration':
      cards = illustrationProjects;
      break;

    case 'other':
      cards = otherProjects;
      break;

    default:
      cards = codeProjects;
      break;
  }

  return {
    props: {
      intro,
      link_list,
      cards
    },
    revalidate: 60 // secs
  };
};
