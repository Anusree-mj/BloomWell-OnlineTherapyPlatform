'use client'

import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const cardItems = [
  { src: '/home/ind.png', title: 'Individual', subTitle: 'For myself', hoverSrc: '/home/indHover.png', color: '#3C7358' },
  { src: '/home/couple.png', title: 'Couples', subTitle: 'For me and my partner', hoverSrc: '/home/coupleHover.png', color: '#265353' },
  { src: '/home/teen.png', title: 'Teen', subTitle: 'For my child', hoverSrc: '/home/teenHover.png', color: '#6f4205' }
]

export default function MediaCover() {
  return (
    <Box sx={{
      paddingTop: '2rem', paddingBottom: '4rem',
      backgroundColor: '#325343', display: 'flex', minHeight: 'calc(100vh - var(--header-height))',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <Box sx={{}}>

        <Typography sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' },
          textAlign: 'center', color: 'white',
          letterSpacing: '0.2rem'
        }
        }>You deserve to be happy.</Typography>
        <Typography sx={{
          fontSize: { xs: '0.9rem', sm: '1rem' },
          textAlign: 'center', color: 'white', mt: 2,
          letterSpacing: '0.1rem'
        }
        }>What type of therapy are you looking for?</Typography>
      </Box>
      <Box
        component="ul"
        sx={{
          display: 'flex', gap: 5, flexWrap: 'wrap', p: 0, mt: 10, maxWidth: '80%',
          alignItems: 'center', justifyContent: 'center'
        }}
      >
        {cardItems.map((item, index) => (
          <Card key={index} component="li" sx={{
            maxWidth: '100%', width: 300, height: 300
          }}
          >
            <CardCover>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' }, backgroundColor: item.color }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={200}
                  height={100}
                  layout='fixed'
                />
              </Box>
            </CardCover>
            <CardContent>
              <Typography
                level="body-lg"
                fontWeight="lg"
                textColor="#fff"
                mt={{ xs: 2, sm: 2 }}
              >
                {item.title}
              </Typography>
              <Typography
                level="body-md"
                textColor="#ddd"
              >
                {item.subTitle}
                <span style={{ marginLeft: '0.5rem' }}><ArrowCircleRightIcon /></span>
              </Typography>

            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
