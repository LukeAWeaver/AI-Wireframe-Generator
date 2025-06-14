import { useState } from 'react'
import {
  Box,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material'

interface FormField {
  id: string
  label: string
  type: string
  required?: boolean
  options?: string[]
}

interface DynamicFormProps {
  onSubmit: (data: Record<string, any>) => void
}

const defaultFields: FormField[] = [
  {
    id: 'feature',
    label: 'Feature Description',
    type: 'textarea',
    required: true
  },
  {
    id: 'complexity',
    label: 'Complexity Level',
    type: 'select',
    required: true,
    options: ['Low', 'Medium', 'High']
  },
  {
    id: 'priority',
    label: 'Priority',
    type: 'select',
    required: true,
    options: ['Low', 'Medium', 'High']
  }
]

export const DynamicForm: React.FC<DynamicFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, any>>({})

  const handleChange = (id: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'textarea':
        return (
          <TextField
            id={field.id}
            label={field.label}
            multiline
            rows={4}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            fullWidth
          />
        )
      case 'select':
        return (
          <FormControl fullWidth required={field.required}>
            <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
            <Select
              labelId={`${field.id}-label`}
              id={field.id}
              value={formData[field.id] || ''}
              label={field.label}
              onChange={(e: SelectChangeEvent) => handleChange(field.id, e.target.value)}
            >
              {field.options?.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      default:
        return null
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {defaultFields.map(field => (
        <Box key={field.id}>
          {renderField(field)}
        </Box>
      ))}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
      >
        Submit
      </Button>
    </Box>
  )
} 