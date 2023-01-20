import { ref } from 'vue'
import { JTableDataType } from '@/components/JTable/type'

const useQueryTableData = (http: () => Promise<JTableDataType>) => {
  const tableData = ref<JTableDataType>([])

  const modelChangeCallback = async (model: Record<string, unknown>) => {
    console.log(`\n`, model)
    console.log(`接口刷新tableData`)
    tableData.value = await http()
  }

  return { tableData, modelChangeCallback }
}

export default useQueryTableData
