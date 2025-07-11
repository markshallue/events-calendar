import React from 'react';
import { Stack, Text, Title } from '@mantine/core';

interface Props {
  title: string;
  subtitle?: string | React.ReactNode;
}

export function ContentHeading({ title, subtitle }: Props) {
  return (
    <Stack gap="xs">
      <Title order={2}>{title}</Title>
      {subtitle && typeof subtitle === 'string' ? <Text>{subtitle}</Text> : subtitle}
    </Stack>
  );
}
