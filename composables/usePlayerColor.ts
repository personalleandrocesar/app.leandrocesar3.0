import { ref, watch, onMounted } from 'vue'

export function usePlayerColor() {
    const selectedClass = ref('Guerreiro')
    const selectedColor = ref('#2ecc71')

    const classColors: Record<string, string> = {
        Guerreiro: '#2ecc71',
        Mago: '#9b59b6',
        Clérigo: '#b800ff',
        Curandeiro: '#2ecc71',
        Assassino: '#e74c3c',
        'Caçador de Elite': '#f39c12',
    }

    function applyColor(color: string) {
        document.documentElement.style.setProperty('--player-color', color)
    }

    function resetColorToDefault() {
        const defaultColor = classColors[selectedClass.value]
        selectedColor.value = defaultColor
        applyColor(defaultColor)
        localStorage.setItem('player-color', defaultColor)
    }

    onMounted(() => {
        const savedColor = localStorage.getItem('player-color')
        const savedClass = localStorage.getItem('player-class')

        if (savedClass && classColors[savedClass]) {
            selectedClass.value = savedClass
        }

        if (savedColor) {
            selectedColor.value = savedColor
            applyColor(savedColor)
        } else {
            const defaultColor = classColors[selectedClass.value]
            selectedColor.value = defaultColor
            applyColor(defaultColor)
        }
    })

    watch(selectedClass, (newClass) => {
        const color = classColors[newClass]
        selectedColor.value = color
        localStorage.setItem('player-class', newClass)
        localStorage.setItem('player-color', color)
        applyColor(color)
    })

    watch(selectedColor, (newColor) => {
        localStorage.setItem('player-color', newColor)
        applyColor(newColor)
    })

    return {
        selectedColor,
        selectedClass,
        classColors,
        resetColorToDefault
    }
}
