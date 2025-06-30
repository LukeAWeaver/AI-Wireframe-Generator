import { useState, FormEvent } from 'react'
import { InputField } from '@compound/InputField'
import { Button } from '@styled/Button'
import { ButtonGroup } from '@compound/ButtonGroup'
import { Box } from '@mui/material'

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
    if (field.type === 'textarea') {
      return (
        <InputField
          id={id}
          label={field.label}
          required={field.required}
          value={formData[id] || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(id, e.target.value)}
          multiline
          rows={4}
        />
      );
    }
    if (field.type === 'select') {
      return (
        <InputField
          id={id}
          label={field.label}
          required={field.required}
          value={formData[id] || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(id, e.target.value)}
          select
          options={field.options}
        />
      );
    }
    return null;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {defaultFields.map(field => (
        <Box key={field.id}>
          {renderField(field)}
        </Box>
      ))}
      <ButtonGroup>
        <Button type="submit" variant="primary" size="lg">
          Submit
        </Button>
      </ButtonGroup>
    </form>
  )
} 