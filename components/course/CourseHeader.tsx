import { ISbRichtext } from '@storyblok/react';
import { useTranslations } from 'next-intl';
import { PROGRESS_STATUS } from '../../constants/enums';
import SimpleButton from '../button/SimpleButton';
import Header from '../layout/Header';

export interface CourseHeaderProps {
  name: string;
  description: ISbRichtext;
  image_with_background: { filename: string; alt: string };
  courseProgress: PROGRESS_STATUS;
  eventData: {};
}

const CourseHeader = (props: CourseHeaderProps) => {
  const { name, description, image_with_background, courseProgress, eventData } = props;

  const headerProps = {
    title: name,
    introduction: description,
    imageSrc: image_with_background?.filename,
    translatedImageAlt: image_with_background?.alt,
    progressStatus: courseProgress,
  };

  const t = useTranslations('Courses');

  return (
    <Header {...headerProps}>
      <SimpleButton href="/courses">
        {t('backToCourses')}
      </SimpleButton>
    </Header>
  );
};

export default CourseHeader;
