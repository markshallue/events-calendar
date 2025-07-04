'use client';

import NextImage from 'next/image';
import { Card, Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import classes from './ImageCarousel.module.css';

export function ImageCarousel({ images }: { images: string[] }) {
	const slides = images?.map(image => (
		<Carousel.Slide key={image}>
			<Image
				component={NextImage}
				width={360}
				height={220}
				src={image}
				alt={image}
				style={{ background: 'linear-gradient(135deg, #aaa, #ccc)' }}
				styles={{ root: { position: 'relative' } }}
			/>
		</Carousel.Slide>
	));

	return (
		<Card.Section className={classes.image} m={0}>
			{images.length < 2 ? (
				<Image
					component={NextImage}
					width={360}
					height={220}
					src={images[0]}
					alt={images[0]}
					style={{ background: 'linear-gradient(135deg, #aaa, #ccc)' }}
					styles={{ root: { position: 'relative', zIndex: 2 } }}
				/>
			) : (
				<Carousel
					classNames={{
						root: classes.carousel,
						indicator: classes.carouselIndicator,
						control: classes.carouselControl,
					}}
					emblaOptions={{ loop: true }}
					withIndicators
				>
					{slides}
				</Carousel>
			)}
		</Card.Section>
	);
}
