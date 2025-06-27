import { useState, FormEvent } from 'react'
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

interface IFeatureRequest {
  feature: string;
  complexity: string;
  priority: string;
}

interface IFormField {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

interface IDynamicFormProps {
  onSubmit: (data: IFeatureRequest) => void;
}

const defaultFields: IFormField[] = [
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

export const DynamicForm = ({ onSubmit }: IDynamicFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    feature: '',
    complexity: '',
    priority: ''
  })

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const featureRequest: IFeatureRequest = {
      feature: formData['feature'] || '',
      complexity: formData['complexity'] || '',
      priority: formData['priority'] || ''
    }
    onSubmit(featureRequest)
  }

  const renderField = (field: IFormField) => {
    const id = field.id;
    switch (field.type) {
      case 'textarea':
        return (
          <TextField
            id={id}
            label={field.label}
            multiline
            rows={4}
            required={field.required}
            value={formData[id] || ''}
            onChange={(e) => handleChange(id, e.target.value)}
            fullWidth
          />
        )
      case 'select':
        return (
          <FormControl fullWidth required={field.required}>
            <InputLabel id={`${id}-label`}>{field.label}</InputLabel>
            <Select
              labelId={`${id}-label`}
              id={id}
              value={formData[id] || ''}
              label={field.label}
              onChange={(e: SelectChangeEvent) => handleChange(id, e.target.value)}
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