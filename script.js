// State Management
const API_URL = 'http://localhost:3000/planillas';
let payroll = [];
let editMode = false;

// DOM Elements
const form = document.getElementById('payroll-form');
const tableBody = document.getElementById('payroll-body');
const totalEmployeesSpan = document.getElementById('total-employees');
const emptyState = document.getElementById('empty-state');
const netSalaryPreview = document.getElementById('net-salary-preview');
const btnCancel = document.getElementById('btn-cancel');
const btnSubmit = document.getElementById('btn-submit');
const formTitle = document.getElementById('form-title');

// Formatting
const formatter = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    fetchRecords();
    setupCalculationListeners();
});

// Calculate Net Salary
function calculateNetSalary() {
    const base = parseFloat(document.getElementById('base-salary').value) || 0;
    const extra = parseFloat(document.getElementById('extra-hours').value) || 0;
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;

    const net = base + extra - deductions;
    netSalaryPreview.textContent = formatter.format(net);
    return net;
}

// Setup listeners for live preview
function setupCalculationListeners() {
    ['base-salary', 'extra-hours', 'deductions'].forEach(id => {
        document.getElementById(id).addEventListener('input', calculateNetSalary);
    });
}

// API Calls
async function fetchRecords() {
    try {
        const response = await fetch(API_URL);
        payroll = await response.json();
        renderTable();
    } catch (error) {
        console.error('Error fetching records:', error);
    }
}

// Render Table
function renderTable() {
    tableBody.innerHTML = '';

    if (payroll.length === 0) {
        emptyState.style.display = 'block';
        totalEmployeesSpan.textContent = '0';
        return;
    }

    emptyState.style.display = 'none';
    totalEmployeesSpan.textContent = payroll.length;

    payroll.forEach((record) => {
        const tr = document.createElement('tr');
        tr.className = 'animate-fade';
        tr.innerHTML = `
            <td>
                <div style="font-weight: 600;">${record.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${record.position}</div>
            </td>
            <td><span style="font-size: 0.875rem;">${record.department}</span></td>
            <td>${formatter.format(record.baseSalary)}</td>
            <td><span class="badge-salary">${formatter.format(record.netSalary)}</span></td>
            <td class="actions">
                <button onclick="editRecord('${record.id}')" class="btn btn-primary btn-icon" title="Editar">
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button onclick="deleteRecord('${record.id}')" class="btn btn-danger btn-icon" title="Eliminar">
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Create/Update Record
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const record = {
        name: document.getElementById('employee-name').value,
        position: document.getElementById('position').value,
        department: document.getElementById('department').value,
        baseSalary: parseFloat(document.getElementById('base-salary').value),
        extraHours: parseFloat(document.getElementById('extra-hours').value),
        deductions: parseFloat(document.getElementById('deductions').value),
        netSalary: calculateNetSalary()
    };

    try {
        if (editMode) {
            const id = document.getElementById('edit-id').value;
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(record)
            });
            exitEditMode();
        } else {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(record)
            });
        }

        fetchRecords();
        form.reset();
        calculateNetSalary();
    } catch (error) {
        console.error('Error saving record:', error);
        alert('Error al guardar el registro');
    }
});

// Delete Record
window.deleteRecord = async (id) => {
    if (confirm('¿Está seguro de eliminar este registro?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchRecords();
            if (editMode) exitEditMode();
        } catch (error) {
            console.error('Error deleting record:', error);
            alert('Error al eliminar');
        }
    }
}

// Edit Record (Load into form)
window.editRecord = (id) => {
    const record = payroll.find(r => r.id == id);
    if (!record) return;

    document.getElementById('edit-id').value = id;
    document.getElementById('employee-name').value = record.name;
    document.getElementById('position').value = record.position;
    document.getElementById('department').value = record.department;
    document.getElementById('base-salary').value = record.baseSalary;
    document.getElementById('extra-hours').value = record.extraHours;
    document.getElementById('deductions').value = record.deductions;

    enterEditMode();
    calculateNetSalary();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function enterEditMode() {
    editMode = true;
    formTitle.textContent = 'Editar Registro';
    btnSubmit.textContent = 'Actualizar Registro';
    btnCancel.style.display = 'block';
}

function exitEditMode() {
    editMode = false;
    formTitle.textContent = 'Registrar Empleado';
    btnSubmit.textContent = 'Guardar Registro';
    btnCancel.style.display = 'none';
    form.reset();
    calculateNetSalary();
}

btnCancel.addEventListener('click', exitEditMode);
