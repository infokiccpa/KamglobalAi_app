const ACCESS = {
    super_admin: { jobs: 'write', applications: 'write', enquiries: 'write', resources: 'write', users: true },
    admin: { jobs: 'write', applications: 'write', enquiries: 'write', resources: 'write', users: false },
    hr: { jobs: 'write', applications: 'write', enquiries: 'read', resources: 'none', users: false },
    recruiter: { jobs: 'write', applications: 'write', enquiries: 'write', resources: 'none', users: false },
    department_manager: { jobs: 'read', applications: 'read', enquiries: 'read', resources: 'read', users: false },
    sales: { jobs: 'read', applications: 'none', enquiries: 'write', resources: 'none', users: false },
    marketing: { jobs: 'read', applications: 'none', enquiries: 'read', resources: 'write', users: false },
    viewer: { jobs: 'read', applications: 'read', enquiries: 'read', resources: 'read', users: false },
};

const rolesWith = (area, level = 'read') => Object.entries(ACCESS)
    .filter(([, access]) => {
        const value = access[area];
        if (!value || value === 'none' || value === false) return false;
        if (level === 'write') return value === 'write' || value === true;
        return true;
    })
    .map(([role]) => role);

module.exports = { ACCESS, rolesWith };
