'use client'

import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useRouter } from "next/navigation";

const cardItems = [
  { src: '/home/ind.png', title: 'Individual', subTitle: 'For myself', hoverSrc: '/home/indHover.png', color: '#397a4a' },
  { src: '/home/couple.png', title: 'Couples', subTitle: 'For me and my partner', hoverSrc: '/home/coupleHover.png', color: '#265353' },
  { src: '/home/teen.png', title: 'Teen', subTitle: 'For my child', hoverSrc: '/home/teenHover.png', color: '#6f4205' }
]

export default function MediaCover() {
  const [hoveredItems, setHoveredItems] = useState(Array(cardItems.length).fill(false));
  const router = useRouter();

  const handleHover = (index: number, isHovered: boolean) => {
    const newHoveredItems = [...hoveredItems];
    newHoveredItems[index] = isHovered;
    setHoveredItems(newHoveredItems);
  };

  const handleClick = () => {
    router.push('/client/register')
  }

  return (
    <Box sx={{
      minHeight: '90vh',
      backgroundColor: '#325343', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pt: 4, pb: 4

    }}>
      <Box sx={{ maxWidth: '90%' }}>
        <Typography sx={{
          fontSize: { xs: '1rem', sm: '2rem' },
          textAlign: 'center', color: 'white',
          letterSpacing: '0.2rem',
        }
        }>You deserve to be happy.</Typography>
        <Typography sx={{
          fontSize: { xs: '0.9rem', sm: '1rem' },
          textAlign: 'center', color: 'white', mt: 1,
          letterSpacing: '0.1rem'
        }
        }>What type of therapy are you looking for?</Typography>
      </Box>
      <Box
        component="ul"
        sx={{
          display: 'flex', gap: 5, flexWrap: 'wrap', mt: 3, maxWidth: '80%',
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        {cardItems.map((item, index) => (
          <Card key={index} component="li" sx={{
            maxWidth: '100%', width: 300, height: 300
          }}
            onMouseEnter={() => handleHover(index, true)}
            onMouseLeave={() => handleHover(index, false)}
            onClick={handleClick}
          >
            <CardCover>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' }, backgroundColor: item.color }}
              >
                <Image
                  src={hoveredItems[index] ? item.hoverSrc : item.src}
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
