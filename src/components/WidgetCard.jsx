import React from 'react'
import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material'
import { motion } from 'framer-motion'

export default function WidgetCard({ title, subtitle, icon, children, height = 'auto' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        margin: 0,
      }}
    >
      <Card
        sx={{
          width: '100%',
          height: '100%',
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))'
            : 'linear-gradient(180deg, #ffffff, #f8f9ff)',
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 10px 30px rgba(0,0,0,0.35)'
            : '0 10px 30px rgba(0,0,0,0.12)',
          border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #eef1ff'
        }}
      >
        <CardHeader
          avatar={icon ? <Box sx={{ fontSize: 32 }}>{icon}</Box> : null}
          title={<Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>}
          subheader={subtitle}
        />
        <CardContent sx={{ pt: 0, px: 3, pb: 3 }}>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
}
